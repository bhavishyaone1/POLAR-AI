$pptxPath = Resolve-Path "POLAR_AI_SIH_2026_IDEA_PRESENTATION_FINAL.pptx"
$pdfPath = [System.IO.Path]::Combine((Get-Location).Path, "POLAR_AI_SIH_2026_IDEA_PRESENTATION_FINAL.pdf")

Write-Host "Opening PowerPoint COM application..."
$pptApp = New-Object -ComObject PowerPoint.Application
try {
    Write-Host "Opening presentation: $pptxPath"
    $presentation = $pptApp.Presentations.Open($pptxPath.Path, [Microsoft.Office.Core.MsoTriState]::msoTrue, [Microsoft.Office.Core.MsoTriState]::msoFalse, [Microsoft.Office.Core.MsoTriState]::msoFalse)
    Write-Host "Exporting to PDF: $pdfPath"
    # 32 corresponds to ppSaveAsPDF
    $presentation.SaveAs($pdfPath, 32)
    $presentation.Close()
    Write-Host "[SUCCESS] PDF created successfully at: $pdfPath"
}
finally {
    $pptApp.Quit()
    [System.Runtime.Interopservices.Marshal]::ReleaseComObject($pptApp) | Out-Null
    [System.GC]::Collect()
    [System.GC]::WaitForPendingFinalizers()
}
