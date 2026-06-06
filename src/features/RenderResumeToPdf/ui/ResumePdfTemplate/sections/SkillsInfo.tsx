import { memo, useCallback } from "react";
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { useTranslation } from "react-i18next";
import { SkillData } from "entities/Resume";
import { Section } from "../layout/Section";


interface SkillsInfoProps {
    data: SkillData[];
}

const styles = StyleSheet.create({
    SkillsInfo: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    skill: {
        justifyContent: 'center',
        alignItems: 'center',
        border: '0.4mm solid #595959',
        borderRadius: '2.2mm',
        paddingVertical: 3,
        paddingHorizontal: 6,
        margin: 2
    }
});

export const SkillsInfo = memo((props: SkillsInfoProps) => {
    const { data } = props;
    const { t, i18n } = useTranslation('preview', {keyPrefix: 'skillsInfo'});

    const renderSkill = useCallback((item: SkillData) => {
        
        return (
            <View style={styles.skill}>
                <Text >{ item.displayName }</Text>
            </View>
        )
    }, [])

    return (
        <Section title={t('title')}>
            <View style={styles.SkillsInfo}>
                { data.map(item => renderSkill(item)) }
            </View>
        </Section>
    )
})