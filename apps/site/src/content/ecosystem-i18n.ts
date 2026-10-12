import type { SupportedLocale } from "@/lib/seo";

export const ECOSYSTEM_CONTENT: Record<
  SupportedLocale,
  {
    badge: string;
    heading: string;
    subtitle: string;
    clients: Array<{
      title: string;
      tag: string;
      desc: string;
    }>;
  }
> = {
  zh: {
    badge: "连接你已有的工具",
    heading: "全面的 Memos 生态无缝兼容",
    subtitle:
      "完整兼容 Memos /api/v1 协议与可撤销个人访问令牌（PAT），你的现有工具链立即可用。",
    clients: [
      {
        title: "Moe Memos",
        tag: "iOS & Android",
        desc: "最受欢迎的开源移动双端，支持直接以 FlareMo 地址与 PAT 凭据连接。",
      },
      {
        title: "Telegram Bot",
        tag: "即时捕捉",
        desc: "随手向专属 Bot 发送文字、图片与语音，几秒内完成碎片灵感入库。",
      },
      {
        title: "AI MCP Server",
        tag: "Model Context Protocol",
        desc: "连接 Claude Desktop、Cursor 与 Codex，将记录库作为 AI 长期记忆体。",
      },
      {
        title: "Raycast / Alfred",
        tag: "桌面心流",
        desc: "全局快捷键一秒唤起输入框，不打断手头心流快速记下闪念。",
      },
    ],
  },
  en: {
    badge: "Bring Your Own Tools",
    heading: "Full Memos Ecosystem Compatibility",
    subtitle:
      "Drop-in compatibility with Memos /api/v1 endpoints and Personal Access Tokens (PAT). Keep your favorite daily tools.",
    clients: [
      {
        title: "Moe Memos",
        tag: "iOS & Android",
        desc: "The most popular open-source mobile client for iOS and Android with direct PAT connection.",
      },
      {
        title: "Telegram Bot",
        tag: "Instant Capture",
        desc: "Send notes, voice memos, and photos directly to your personal bot in seconds.",
      },
      {
        title: "AI MCP Server",
        tag: "Model Context Protocol",
        desc: "Connect Claude Desktop, Cursor, and Codex as your AI long-term external brain.",
      },
      {
        title: "Raycast / Alfred",
        tag: "Desktop Workflow",
        desc: "Trigger global quick-capture shortcuts on desktop without breaking your creative flow.",
      },
    ],
  },
};
