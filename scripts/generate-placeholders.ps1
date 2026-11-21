# Generates tasteful placeholder images (soft gradient + centred muted label).
# Windows PowerShell 5.1 / System.Drawing; no npm dependencies.
# Usage (from repo root):  powershell -ExecutionPolicy Bypass -File scripts/generate-placeholders.ps1

Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$pub = Join-Path $root "public"
$img = Join-Path $pub "images"
New-Item -ItemType Directory -Force $img | Out-Null

function C([string]$hex, [int]$a = 255) {
  $h = $hex.TrimStart('#')
  [System.Drawing.Color]::FromArgb($a, [Convert]::ToInt32($h.Substring(0, 2), 16), [Convert]::ToInt32($h.Substring(2, 2), 16), [Convert]::ToInt32($h.Substring(4, 2), 16))
}

function New-Canvas([int]$w, [int]$h) {
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  return @($bmp, $g)
}

function Fill-Soft($g, [int]$w, [int]$h) {
  $rect = New-Object System.Drawing.Rectangle 0, 0, $w, $h
  $lg = New-Object System.Drawing.Drawing2D.LinearGradientBrush $rect, (C '#EEF0FA'), (C '#F7EEFB'), 35
  $g.FillRectangle($lg, $rect)
  # soft colour fields
  foreach ($spec in @(@('#8B7CF6', 0.05, -0.2, 0.7, 60), @('#F0ABFC', 0.6, 0.35, 0.7, 70), @('#93C5FD', 0.25, 0.6, 0.6, 60))) {
    $cx = [int]($w * $spec[1]); $cy = [int]($h * $spec[2]); $r = [int]([Math]::Max($w, $h) * $spec[3] / 2)
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path.AddEllipse($cx - $r, $cy - $r, 2 * $r, 2 * $r)
    $pg = New-Object System.Drawing.Drawing2D.PathGradientBrush $path
    $pg.CenterColor = C $spec[0] $spec[4]
    $pg.SurroundColors = @((C $spec[0] 0))
    $g.FillPath($pg, $path)
  }
}

function Draw-Centered($g, [string]$text, [float]$size, [string]$hex, [int]$w, [float]$y, [string]$style = 'Regular') {
  $font = New-Object System.Drawing.Font 'Segoe UI', $size, ([System.Drawing.FontStyle]::$style), ([System.Drawing.GraphicsUnit]::Pixel)
  $brush = New-Object System.Drawing.SolidBrush (C $hex)
  $sf = New-Object System.Drawing.StringFormat
  $sf.Alignment = [System.Drawing.StringAlignment]::Center
  $rf = New-Object System.Drawing.RectangleF 0, $y, $w, ($size * 2)
  $g.DrawString($text, $font, $brush, $rf, $sf)
}

function Save-Png($bmp, $g, [string]$path) {
  $g.Dispose(); $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png); $bmp.Dispose()
  Write-Output "wrote $path"
}

function Draw-Logo($g, [float]$x, [float]$y, [float]$s) {
  # Eye-O: almond (two cubic curves) + four-point spark pupil; then the G.
  $navy = New-Object System.Drawing.Pen (C '#0F172A'), (2.6 * $s)
  $navy.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
  $navy.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $navy.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $p = { param($px, $py) New-Object System.Drawing.PointF ($x + $px * $s), ($y + $py * $s) }
  $eye = New-Object System.Drawing.Drawing2D.GraphicsPath
  $eye.AddBezier((& $p 2.5 16), (& $p 8 7.2), (& $p 24 7.2), (& $p 29.5 16))
  $eye.AddBezier((& $p 29.5 16), (& $p 24 24.8), (& $p 8 24.8), (& $p 2.5 16))
  $eye.CloseFigure()
  $g.DrawPath($navy, $eye)

  $spark = New-Object System.Drawing.Drawing2D.GraphicsPath
  $spark.AddBezier((& $p 16 9.2), (& $p 16.75 13.6), (& $p 18.4 15.25), (& $p 22.8 16))
  $spark.AddBezier((& $p 22.8 16), (& $p 18.4 16.75), (& $p 16.75 18.4), (& $p 16 22.8))
  $spark.AddBezier((& $p 16 22.8), (& $p 15.25 18.4), (& $p 13.6 16.75), (& $p 9.2 16))
  $spark.AddBezier((& $p 9.2 16), (& $p 13.6 15.25), (& $p 15.25 13.6), (& $p 16 9.2))
  $spark.CloseFigure()
  $sr = New-Object System.Drawing.RectangleF ($x + 9 * $s), ($y + 9 * $s), (14 * $s), (14 * $s)
  $sb = New-Object System.Drawing.Drawing2D.LinearGradientBrush $sr, (C '#8B7CF6'), (C '#F0ABFC'), 45
  $g.FillPath($sb, $spark)

  # G: arc from -45deg sweeping counter-clockwise 315deg, then crossbar to centre.
  $gp = New-Object System.Drawing.Drawing2D.GraphicsPath
  $gp.AddArc(($x + 38 * $s), ($y + 6 * $s), (20 * $s), (20 * $s), -45, -315)
  $gp.AddLine((& $p 58 16), (& $p 49 16))
  $g.DrawPath($navy, $gp)
}

# --- Screenshots (1200x800) ----------------------------------------------
$shots = @(
  @('ogc-search-console.png', 'Search Console screenshot'),
  @('ogc-chatgpt.png', 'ChatGPT answer screenshot'),
  @('ogc-ai-overview.png', 'Google AI Overview screenshot')
)
foreach ($s in $shots) {
  $c = New-Canvas 1200 800; $bmp = $c[0]; $g = $c[1]
  Fill-Soft $g 1200 800
  # faux UI rows for a hint of "screenshot"
  $row = New-Object System.Drawing.SolidBrush (C '#0F172A' 14)
  for ($i = 0; $i -lt 5; $i++) { $g.FillRectangle($row, 140, (250 + $i * 34), (920 - ($i * 97 % 300)), 12) }
  Draw-Centered $g $s[1] 44 '#475569' 1200 480 'Bold'
  Draw-Centered $g 'Placeholder: replace before launch' 26 '#64748B' 1200 548
  Save-Png $bmp $g (Join-Path $img $s[0])
}

# --- Founder (480x480 jpg) -------------------------------------------------
$c = New-Canvas 480 480; $bmp = $c[0]; $g = $c[1]
Fill-Soft $g 480 480
$head = New-Object System.Drawing.SolidBrush (C '#0F172A' 30)
$g.FillEllipse($head, 180, 110, 120, 120)
$g.FillEllipse($head, 110, 260, 260, 220)
Draw-Centered $g 'Founder photo' 30 '#475569' 480 40 'Bold'
$g.Dispose()
$enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$ep = New-Object System.Drawing.Imaging.EncoderParameters 1
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), 86L
$bmp.Save((Join-Path $img 'founder.jpg'), $enc, $ep); $bmp.Dispose()
Write-Output "wrote $(Join-Path $img 'founder.jpg')"

# --- Open Graph (1200x630) -------------------------------------------------
$c = New-Canvas 1200 630; $bmp = $c[0]; $g = $c[1]
Fill-Soft $g 1200 630
Draw-Logo $g 470 150 4.3
Draw-Centered $g 'Get recommended in AI search.' 68 '#0F172A' 1200 330 'Bold'
$dot = [char]0x00B7
Draw-Centered $g "The OG Company  $dot  SEO + AEO for the AI search era" 30 '#475569' 1200 440
Save-Png $bmp $g (Join-Path $pub 'og.png')
