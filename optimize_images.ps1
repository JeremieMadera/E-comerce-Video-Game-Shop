<#
  .SYNOPSIS
    Script de Optimización Automática de Imágenes para VEJIGAMES.
    Reduce peso de imágenes JPG para velocidad y 100% en Lighthouse.
#>

Add-Type -AssemblyName System.Drawing

function Optimize-SingleImage {
    param(
        [string]$FilePath,
        [int]$MaxWidth,
        [int]$MaxHeight,
        [long]$Quality = 75
    )

    $item = Get-Item $FilePath
    $origSize = $item.Length
    
    # Cargar imagen
    try {
        $img = [System.Drawing.Image]::FromFile($item.FullName)
    } catch {
        Write-Host "No se pudo abrir $FilePath" -ForegroundColor Red
        return
    }

    $origW = $img.Width
    $origH = $img.Height

    # Calcular nuevas dimensiones proporcionales
    $ratioX = $MaxWidth / $origW
    $ratioY = $MaxHeight / $origH
    $ratio = [Math]::Min($ratioX, $ratioY)
    if ($ratio -gt 1.0) { $ratio = 1.0 }

    $newW = [int]($origW * $ratio)
    $newH = [int]($origH * $ratio)

    # Si ya está optimizada en dimensiones y pesa menos de 150KB (o 300KB para hero), no sobre-comprimir
    $isHero = $FilePath -match "Assets[\\/]hero"
    $sizeThreshold = if ($isHero) { 300000 } else { 160000 }
    
    if ($ratio -ge 1.0 -and $origSize -le $sizeThreshold) {
        $img.Dispose()
        Write-Host "  OK (Ya optimizada): $FilePath ($([Math]::Round($origSize/1024, 1)) KB)" -ForegroundColor DarkGray
        return
    }

    # Crear bitmap escalado con calidad bicúbica alta
    $bmp = New-Object System.Drawing.Bitmap $newW, $newH
    $graph = [System.Drawing.Graphics]::FromImage($bmp)
    $graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graph.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graph.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graph.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

    $graph.DrawImage($img, 0, 0, $newW, $newH)
    $graph.Dispose()
    $img.Dispose()

    # Configurar codificador JPEG
    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    $encParams = New-Object System.Drawing.Imaging.EncoderParameters 1
    $encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality, $Quality)

    $tempFile = $item.FullName + ".tmp.jpg"
    $bmp.Save($tempFile, $codec, $encParams)
    $bmp.Dispose()

    $newSize = (Get-Item $tempFile).Length

    # Solo reemplazar si el nuevo archivo es más liviano
    if ($newSize -lt $origSize) {
        Move-Item -Force $tempFile $item.FullName
        $saved = $origSize - $newSize
        $pct = [Math]::Round(($saved / $origSize) * 100, 1)
        Write-Host "  OPTIMIZADA: $FilePath" -ForegroundColor Green
        Write-Host "    $origW x $origH -> $newW x $newH | $([Math]::Round($origSize/1024, 1)) KB -> $([Math]::Round($newSize/1024, 1)) KB (-$pct%)" -ForegroundColor Cyan
    } else {
        Remove-Item -Force $tempFile
        Write-Host "  MANTENIDA: $FilePath (el archivo original ya era óptimo)" -ForegroundColor DarkGray
    }
}

Write-Host "==========================================================" -ForegroundColor Yellow
Write-Host "  OPTIMIZADOR DE IMÁGENES - VEJIGAMES" -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Yellow

$assetsPath = Join-Path $PSScriptRoot "Assets"
if (-not (Test-Path $assetsPath)) {
    $assetsPath = "Assets"
}

$jpgFiles = Get-ChildItem -Path $assetsPath -Recurse -Include *.jpg, *.jpeg

Write-Host "Se encontraron $($jpgFiles.Count) imágenes JPG para revisar.`n" -ForegroundColor White

foreach ($file in $jpgFiles) {
    $rel = $file.FullName.Replace((Get-Location).Path + "\", "")
    
    if ($file.FullName -match "Assets[\\/]hero") {
        if ($file.Name -eq "gta-6-mobile.jpg") {
            # Versión móvil ligera para 4G Slow
            Optimize-SingleImage -FilePath $file.FullName -MaxWidth 720 -MaxHeight 900 -Quality 70
        } else {
            # Fondos de pantalla completa Hero Desktop
            Optimize-SingleImage -FilePath $file.FullName -MaxWidth 1280 -MaxHeight 720 -Quality 68
        }
    } elseif ($file.FullName -match "Assets[\\/]DLC") {
        # Imágenes de expansiones y DLCs
        Optimize-SingleImage -FilePath $file.FullName -MaxWidth 1000 -MaxHeight 750 -Quality 75
    } else {
        # Carátulas de catálogo y tarjetas de juegos
        Optimize-SingleImage -FilePath $file.FullName -MaxWidth 600 -MaxHeight 850 -Quality 75
    }
}

Write-Host "`nProceso completado con éxito." -ForegroundColor Green
