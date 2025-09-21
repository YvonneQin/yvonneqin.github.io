#!/bin/bash

# 从配置文件更新iconfont链接的脚本
# 使用方法: ./update-iconfont-from-config.sh

CONFIG_FILE="iconfont-config.json"

# 检查配置文件是否存在
if [ ! -f "$CONFIG_FILE" ]; then
    echo "❌ 配置文件不存在: $CONFIG_FILE"
    exit 1
fi

# 从JSON配置文件中提取iconfont URL
ICONFONT_URL=$(grep -o '"url": "[^"]*"' "$CONFIG_FILE" | cut -d'"' -f4)

if [ -z "$ICONFONT_URL" ]; then
    echo "❌ 无法从配置文件中提取iconfont URL"
    exit 1
fi

echo "📖 从配置文件读取iconfont链接: $ICONFONT_URL"
echo "🔄 正在更新所有HTML文件..."

# 查找并更新所有HTML文件
find . -name "*.html" -type f -exec sed -i '' "s|https://at\.alicdn\.com/t/c/font_[^.]*\.css|$ICONFONT_URL|g" {} \;

# 统计更新的文件数量
UPDATED_FILES=$(find . -name "*.html" -type f -exec grep -l "at\.alicdn\.com" {} \; | wc -l)

echo "✅ 更新完成！"
echo "📊 共更新了 $UPDATED_FILES 个文件"
echo "🔗 当前iconfont链接: $ICONFONT_URL"
echo ""
echo "💡 要修改iconfont链接，请编辑 $CONFIG_FILE 文件中的 url 字段"
