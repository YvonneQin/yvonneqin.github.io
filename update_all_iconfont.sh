#!/bin/bash

# 统一更换所有HTML文件中iconfont链接的脚本
# 使用方法: ./update_all_iconfont.sh [新链接]

# 默认的新链接（如果没有提供参数）
NEW_ICONFONT_URL="https://at.alicdn.com/t/c/font_4545731_cvnf4bw0cg.css"

# 如果提供了参数，使用新的链接
if [ $# -eq 1 ]; then
    NEW_ICONFONT_URL="$1"
fi

echo "正在更新所有HTML文件中的iconfont链接到: $NEW_ICONFONT_URL"
echo ""

# 查找所有包含iconfont链接的HTML文件
ICONFONT_FILES=$(find . -name "*.html" -type f -exec grep -l "at\.alicdn\.com" {} \;)

if [ -z "$ICONFONT_FILES" ]; then
    echo "没有找到包含iconfont链接的HTML文件"
    exit 0
fi

echo "找到以下包含iconfont链接的文件:"
echo "$ICONFONT_FILES"
echo ""

# 更新每个文件
for file in $ICONFONT_FILES; do
    echo "正在更新: $file"
    
    # 备份原文件
    cp "$file" "$file.backup"
    
    # 替换iconfont链接
    # 匹配模式: https://at.alicdn.com/t/c/font_数字_任意字符.css
    sed -i '' "s|https://at\.alicdn\.com/t/c/font_[^.]*\.css|$NEW_ICONFONT_URL|g" "$file"
    
    # 验证替换是否成功
    if grep -q "$NEW_ICONFONT_URL" "$file"; then
        echo "✓ 已更新: $file"
    else
        echo "⚠ 更新失败: $file"
    fi
done

echo ""
echo "更新完成！"
echo "备份文件已保存为 .backup 扩展名"
echo ""
echo "如需恢复，请运行:"
echo "find . -name '*.html.backup' -exec sh -c 'mv \"\$1\" \"\${1%.backup}\"' _ {} \;"
