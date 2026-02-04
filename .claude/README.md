# Claude Skills Configuration

## Directory Structure

```
ShredBladeWeb/
├── .claude/
│   └── skills/
│       └── frontend-design.md        # Claude Code Agent 技能
├── .agents/
│   └── skills/
│       └── frontend-design.md        # 其他 Agents 技能
└── .github/
    └── prompts/
        └── ui-ux-pro-max.prompt.md   # UI/UX 工作流提示
```

## 已安装的技能

### frontend-design
- **描述**: 创建生产级别的前端界面设计
- **位置**: `.claude/skills/` 和 `.agents/skills/`
- **应用于**: Claude Code, Cline, CodeBuddy, Codex, OpenCode
- **功能**:
  - ✅ 组件设计和结构
  - ✅ 响应式布局模式
  - ✅ 颜色和排版系统
  - ✅ 无障碍访问 (A11y)
  - ✅ Tailwind CSS 集成
  - ✅ React 组件最佳实践

## 使用方法

### 方式 1: Chat 中激活
```
/skill frontend-design
请为我的产品页面优化 UI 设计
```

### 方式 2: 项目中使用
在你的代码编辑器或 Agent 中：
```
@frontend-design 帮我改进英雄区域的设计
```

### 方式 3: 与提示结合
结合 `.github/prompts/ui-ux-pro-max.prompt.md` 使用：
```
参考 ui-ux-pro-max 和 frontend-design 技能，
为 single-shaft-shredder-blades 页面创建新设计
```

## 技能说明

### Claude Code (.claude/skills/)
- 用于 Claude 官方代码助手
- 自动在代码编辑集成中加载

### Agents (.agents/skills/)
- 用于其他 Agent（Cline, CodeBuddy 等）
- 支持多 Agent 协作

## 下一步

1. 在 Chat 中尝试: `/skill frontend-design`
2. 描述你的设计需求
3. 让 AI 提供设计建议和代码实现

---
Setup Date: 2026-02-04
Project: Shredder Blades Direct Website
Tech Stack: React 18 + TypeScript + Tailwind CSS + shadcn/ui
