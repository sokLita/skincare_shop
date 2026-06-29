$filePath = "c:\Users\LITA.SOK\Desktop\skincare_shop\frontend\src\views\Home.vue"
$content = Get-Content $filePath -Raw

# Fix 1: Remove the leftover "handleSubscribe() {" line and the corrupted newsletter section
$content = $content -replace "    },\r?\n    handleSubscribe\(\) \{\r?\n  watch: \{", "    },`r`n  watch: {"

# Fix 2: Remove the remaining newsletter CSS section (lines between bestseller media queries and VIDEO MODAL section)
$content = $content -replace "`r?`n`r?`n/\* ==============================================\r?\n   NEWSLETTER SECTION\r?\n   ============================================== \*/`r?\n\.newsletter-section \{ padding: 60px 0 80px; background: var\(--bg-secondary\); \}`r?\n\.newsletter-card \{\r?\n  background: linear-gradient\(135deg, #fce4ec 0%, #fdf2f6 50%, #ffffff 100%\);\r?\n", "`r`n"

# Write the result
$content | Set-Content $filePath -Encoding UTF8 -NoNewline
Write-Output "Done with targeted fixes."
