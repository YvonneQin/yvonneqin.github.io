#!/bin/bash

# 快速清理备份文件（无确认）
echo "🧹 快速清理备份文件..."

# 统计并删除
BACKUP_COUNT=$(find . -name "*.backup*" -type f | wc -l)
echo "📊 发现 $BACKUP_COUNT 个备份文件"

if [ $BACKUP_COUNT -gt 0 ]; then
    find . -name "*.backup*" -type f -delete
    echo "✅ 已删除所有备份文件"
else
    echo "✅ 没有备份文件需要清理"
fi
