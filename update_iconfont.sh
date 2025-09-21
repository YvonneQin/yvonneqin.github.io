#!/bin/bash

# 统一更换iconfont链接的脚本
# 使用方法: ./update_iconfont.sh [新链接]

# 默认的新链接（如果没有提供参数）
NEW_ICONFONT_URL="https://at.alicdn.com/t/c/font_4545731_cvnf4bw0cg.css"

# 如果提供了参数，使用新的链接
if [ $# -eq 1 ]; then
    NEW_ICONFONT_URL="$1"
fi

echo "正在更新iconfont链接到: $NEW_ICONFONT_URL"

# 查找所有包含iconfont链接的HTML文件
FILES=(
    "./index.html"
    "./_site/index.html" 
    "./project_Redcity.html"
    "./_site/project_Redcity.html"
)

# 更新每个文件
for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "正在更新: $file"
        
        # 备份原文件
        cp "$file" "$file.backup"
        
        # 替换iconfont链接
        # 匹配模式: https://at.alicdn.com/t/c/font_数字_任意字符.css
        sed -i '' "s|https://at\.alicdn\.com/t/c/font_[^.]*\.css|$NEW_ICONFONT_URL|g" "$file"
        
        echo "✓ 已更新: $file"
    else
        echo "⚠ 文件不存在: $file"
    fi
done

echo ""
echo "更新完成！"
echo "备份文件已保存为 .backup 扩展名"
echo ""
echo "如需恢复，请运行:"
echo "for file in *.html.backup; do mv \"\$file\" \"\${file%.backup}\"; done"
