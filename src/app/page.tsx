'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Center, Container, Group, Stack, Title } from '@mantine/core'
import { fetchUserByTelegramId } from '@/api/fetchUserByTgId'
import { fetchAppEnv } from '@/api/fetchAppEnv'
import { initData, useSignal } from '@telegram-apps/sdk-react'
import { Loading } from '@/components/Loading/Loading'
import { ofetch } from 'ofetch'
import { LocaleSwitcher } from '@/components/LocaleSwitcher/LocaleSwitcher'
import { SubscribeCta } from '@/components/SubscribeCTA/SubscribeCTA'
import { ErrorConnection } from '@/components/ErrorConnection/ErrorConnection'
import { SubscriptionQR } from '@/components/SubQR/SubQR'
import { SubscriptionInfoWidget } from '@/components/SubscriptionInfoWidget/SubscriptionInfoWidget'
import { InstallationGuideWidget } from '@/components/InstallationGuideWidget/InstallationGuideWidget'

import { IPlatformConfig } from '@/types/appList'

import classes from './app.module.css'
import { GetSubscriptionInfoByShortUuidCommand } from '@localzet/aura-contract'

export default function Home() {
    const t = useTranslations()

    const initDataState = useSignal(initData.state)
    const telegramId = initDataState?.user?.id
    const [subscription, setSubscription] = useState<
        GetSubscriptionInfoByShortUuidCommand.Response['response'] | null
    >(null)
    const [subscriptionLoaded, setSubscriptionLoaded] = useState(false)
    const [appsConfig, setAppsConfig] = useState<IPlatformConfig | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [publicEnv, setPublicEnv] = useState<{
        cryptoLink: boolean
        buyLink: string
        redirectLink: string
    } | null>(null)

    const [errorConnect, setErrorConnect] = useState(false)

    const activeSubscription =
        subscription?.user?.userStatus && subscription?.user?.userStatus === 'ACTIVE'

    useEffect(() => {
        setIsLoading(true)

        const fetchConfig = async () => {
            try {
                const cofingEnv = await fetchAppEnv()
                if (cofingEnv) setPublicEnv(cofingEnv)
            } catch (error) {
                console.error('Failed to fetch app config:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchConfig()
    }, [])

    useEffect(() => {
        if (telegramId) {
            const fetchSubscription = async () => {
                setIsLoading(true)
                try {
                    const user = await fetchUserByTelegramId(telegramId)
                    if (user) {
                        setSubscription(user)
                    }

                } catch (error) {
                    const errorMessage =
                        error instanceof Error ? error.message : 'Unknown error occurred'
                    if (errorMessage !== 'Users not found') {
                        setErrorConnect(true)
                    }
                    console.error('Failed to fetch subscription:', error)
                } finally {
                    setSubscriptionLoaded(true)
                    setIsLoading(false)
                }
            }

            fetchSubscription()
        }
    }, [telegramId])

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const config = await ofetch<IPlatformConfig>(
                    `/assets/app-config.json?v=${Date.now()}`,
                    {
                        parseResponse: JSON.parse
                    }
                )
                setAppsConfig(config)
            } catch (error) {
                console.error('Failed to fetch app config:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchConfig()
    }, [])

    if (errorConnect)
        return (
            <Container className={classes.main} my="xl" size="xl">
                <Center>
                    <Stack gap="xl">
                        <Title style={{ textAlign: 'center' }} order={4}>
                            {t('main.page.component.error-connect')}
                        </Title>
                        <ErrorConnection />
                    </Stack>
                </Center>
            </Container>
        )

    if (isLoading || !appsConfig) return <Loading />

    if (subscriptionLoaded && !subscription)
        return (
            <Container className={classes.main} my="xl" size="xl">
                <Center>
                    <Stack gap="xl">
                        <Title style={{ textAlign: 'center' }} order={4}>
                            {t('main.page.component.no-sub')}
                        </Title>
                        <SubscribeCta buyLink={publicEnv?.buyLink} />
                    </Stack>
                </Center>
            </Container>
        )

    if (subscriptionLoaded && subscription)
        return (
            <Container my="xl" size="xl">
                <Stack gap="xl">
                    <Group justify="space-between">
                        <Group gap="xs">
                            <Title order={4}>{t('main.page.component.podpiska')}</Title>
                        </Group>
                        <Group gap="xs">
                            {!publicEnv?.cryptoLink && (
                                <SubscriptionQR subscription={subscription.subscriptionUrl} />
                            )}
                            <LocaleSwitcher />
                        </Group>
                    </Group>
                    <Stack gap="xl">
                        <SubscriptionInfoWidget user={subscription} />
                        {activeSubscription ? (
                            <InstallationGuideWidget
                                user={subscription}
                                appsConfig={appsConfig}
                                isCryptoLinkEnabled={publicEnv?.cryptoLink}
                                redirectLink={publicEnv?.redirectLink}
                            />
                        ) : (
                            <SubscribeCta buyLink={publicEnv?.buyLink} />
                        )}
                    </Stack>
                </Stack>
            </Container>
        )

    return null
}
