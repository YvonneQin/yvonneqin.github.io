#!/bin/bash

# 快速更新iconfont链接的脚本
# 使用方法: ./quick_iconfont_update.sh [新链接]

NEW_URL="${1:-https://at.alicdn.com/t/c/font_4545731_cvnf4bw0cg.css}"

echo "更新iconfont链接到: $NEW_URL"

# 使用find和sed一次性更新所有文件
find . -name "*.html" -type f -exec sed -i '' "s|https://at\.alicdn\.com/t/c/font_[^.]*\.css|$NEW_URL|g" {} \;

echo "更新完成！"
