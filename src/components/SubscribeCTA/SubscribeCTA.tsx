import { Box, Button, Stack } from '@mantine/core'
import classes from '@/app/app.module.css'
import Lottie from 'lottie-react'
import noSubAnimate from '@public/assets/anamations/no-sub.json'
import { useTranslations } from 'next-intl'

export function SubscribeCta({ buyLink }: { buyLink: string | undefined }) {
    const t = useTranslations()

    return (
        <Stack gap="xl">
            <Box className={classes.animateBox} w={200}>
                <Lottie animationData={noSubAnimate} loop />
            </Box>
            <Button component="a" href={buyLink} target="_blank" color="cyan">
                {t('main.page.component.buy')}
            </Button>
        </Stack>
    )
}
