'use client'

import { useLocale } from 'next-intl'
import { FC, useState } from 'react'

import { localesMap } from '@/core/i18n/config'
import { setLocale } from '@/core/i18n/locale'
import { Locale } from '@/core/i18n/types'
import { Button, Group, Menu, Text } from '@mantine/core'
import { IconSettings } from '@tabler/icons-react'


export const LocaleSwitcher: FC = () => {
    const locale = useLocale()

    const [opened, setOpened] = useState(false)

    const changeLanguage = (value: string) => {
        const locale = value as Locale
        setLocale(locale)

    }

    const selected = localesMap.find((item) => item.value === locale) || localesMap[0]


    const items = localesMap.map((item) => (
        <Menu.Item
            key={item.value}
            leftSection={<Text>{item.emoji}</Text>}
            onClick={() => changeLanguage(item.value)}
        >
            {item.label}
        </Menu.Item>
    ))

    return (
        <Menu
            width={120}
            onClose={() => setOpened(false)}
            onOpen={() => setOpened(true)}
            radius="md"
            withinPortal
        >
            <Menu.Target>
                <Button color="grape" data-expanded={opened || undefined}>
                    <Group gap="xs">
                        <IconSettings stroke={2} />
                    </Group>
                </Button>
            </Menu.Target>
            <Menu.Dropdown>{items}</Menu.Dropdown>
        </Menu>
    )
}
