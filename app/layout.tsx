import '@mantine/core/styles.css'
import { MantineProvider, ColorSchemeScript } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { TooltipProvider } from "@/components/ui/tooltip"
import { Button } from '@mantine/core';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'OpenAI 和 AI SDK 聊天机器人',
  description: '使用 AI SDK 和 gpt-4o-mini 构建的增强型聊天机器人。',
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={cn('antialiased', inter.className)}>
        <MantineProvider defaultColorScheme="auto">
          <ModalsProvider>
            <Notifications />
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  )
}

import './globals.css'