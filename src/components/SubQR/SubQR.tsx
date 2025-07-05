import { Button, Image, Modal, Stack, Text } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useClipboard } from '@mantine/hooks'
import { modals } from '@mantine/modals'
import { renderSVG } from 'uqr'

import { useTranslations } from 'next-intl'
import { useState } from 'react'

export const SubscriptionQR = ({ subscription }: { subscription: string }) => {
    const t = useTranslations()
    const clipboard = useClipboard({ timeout: 10000 })

    const subscriptionQrCode = renderSVG(subscription, {
        whiteColor: '#161B22',
        blackColor: '#3CC9DB'
    })

    const [open, setOpen] = useState(false)

    const handleCopy = () => {
        notifications.show({
            title: t('subscription-link.widget.link-copied'),
            message: t('subscription-link.widget.link-copied-to-clipboard'),
            color: 'teal'
        })
        clipboard.copy(subscription)
    }

    if (!subscription) return null


    return (
        <>
            <Modal opened={open} onClose={() => setOpen(false)} title={t('subscription-link.widget.get-link')}>

                {subscriptionQrCode && (
                    <Stack align="center">
                        <Image
                            src={`data:image/svg+xml;utf8,${encodeURIComponent(subscriptionQrCode)}`}
                        />
                        <Text fw={600} size="lg" ta="center">
                            {t('subscription-link.widget.scan-qr-code')}
                        </Text>
                        <Text c="dimmed" size="sm" ta="center">
                            {t('subscription-link.widget.line-1')}
                        </Text>

                        <Button fullWidth onClick={handleCopy} variant="filled">
                            {t('subscription-link.widget.copy-link')}
                        </Button>
                    </Stack>
                )}

            </Modal>
            <Button
                onClick={() => {
                    setOpen(true)


                    modals.open({
                        centered: true,
                        title: t('subscription-link.widget.get-link'),
                        children: (
                            <>
                                <Stack align="center">
                                    <Image
                                        src={`data:image/svg+xml;utf8,${encodeURIComponent(subscriptionQrCode)}`}
                                    />
                                    <Text fw={600} size="lg" ta="center">
                                        {t('subscription-link.widget.scan-qr-code')}
                                    </Text>
                                    <Text c="dimmed" size="sm" ta="center">
                                        {t('subscription-link.widget.line-1')}
                                    </Text>

                                    <Button fullWidth onClick={handleCopy} variant="filled">
                                        {t('subscription-link.widget.copy-link')}
                                    </Button>
                                </Stack>
                            </>
                        )
                    })
                }}
                variant="outline"
            >
                {t('subscription-link.widget.get-link')}
            </Button>
        </>
    )
}
