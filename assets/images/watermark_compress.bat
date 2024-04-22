@echo off
setlocal

set IMAGEMAGICK_PATH=C:\Program Files\ImageMagick-7.1.1-Q16-HDRI\magick.exe
set WATERMARK_IMAGE=C:\Users\Rynan\Documents\Github\rkcabell\rkcabell.github.io\assets\images\watermark.png
set SOURCE_DIR1=C:\Users\Rynan\Documents\Github\rkcabell\rkcabell.github.io\assets\images\cat_img
set SOURCE_DIR2=C:\Users\Rynan\Documents\Github\rkcabell\rkcabell.github.io\assets\images\art_img
set OUTPUT_DIR=C:\Users\Rynan\Documents\Github\rkcabell\rkcabell.github.io\assets\images\thumbnails

echo Deleting existing files in the thumbnails directory...
del /q "%OUTPUT_DIR%\*"

echo Starting processing art images...
for %%f in ("%SOURCE_DIR2%\*.png" "%SOURCE_DIR2%\*.jpg" "%SOURCE_DIR2%\*.jpeg") do (
    echo Processing %%f
    "%IMAGEMAGICK_PATH%" composite -gravity center "%WATERMARK_IMAGE%" "%%f" "%OUTPUT_DIR%\%%~nxf"
    echo Saved to %OUTPUT_DIR%\%%~nxf
)

echo Starting processing cat images...
for %%f in ("%SOURCE_DIR1%\*.png" "%SOURCE_DIR1%\*.jpg" "%SOURCE_DIR1%\*.jpeg") do (
    echo Processing %%f
    "%IMAGEMAGICK_PATH%" convert "%%f" -resize 620x "%OUTPUT_DIR%\%%~nxf"
    echo Saved to %OUTPUT_DIR%\%%~nxf
)

echo All files have been processed.
pause
