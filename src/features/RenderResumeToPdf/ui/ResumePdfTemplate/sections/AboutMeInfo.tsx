import { memo } from "react";
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { useTranslation } from "react-i18next";
import { Section } from "../layout/Section";


interface AboutMeInfoProps {
    data: string;
}

const styles = StyleSheet.create({
    aboutMeInfo: {
        //flexDirection: 'column',
    },
    aboutMe: {
        paddingTop: 0
    }
});

export const AboutMeInfo = memo((props: AboutMeInfoProps) => {
    const { data } = props;
    const { t, i18n } = useTranslation('preview', {keyPrefix: 'aboutMeInfo'});

    return (
        <Section title={t('title')}>
            <View style={styles.aboutMeInfo}>
                <Text style={styles.aboutMe}>{ data }</Text>
            </View>
        </Section>
    )
})