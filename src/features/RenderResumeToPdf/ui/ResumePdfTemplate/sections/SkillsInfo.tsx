import { memo, useCallback, useState } from "react";
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { useTranslation } from "react-i18next";
import { SkillData } from "entities/Skill";
import { Section } from "../layout/Section";
import { loadSkillsByLocale } from 'entities/Skill';
import { useEffect } from 'react';

interface SkillsInfoProps {
    data: string[];
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
    const [skillsList, setSkillsList] = useState<SkillData[]>([]);
    
    useEffect(() => {
        let cancelled = false;

        const loadSkills = async () => {
            const skills = await loadSkillsByLocale(i18n.language);

            if (!cancelled) {
                setSkillsList(skills);
            }
        };

        loadSkills();
        return () => {
            cancelled = true;
        };
    }, [i18n.language]);

    const renderSkill = useCallback((id: string) => {

        const skillRecord = skillsList.find(item => item.id === id);
        if (!skillRecord) return;

        return (
            <View style={styles.skill}>
                <Text >{ `${skillRecord.displayName}` }</Text>
            </View>
        )
    }, [skillsList])

    return (
        <Section title={t('title')}>
            <View style={styles.SkillsInfo}>
                { data.map(item => renderSkill(item)) }
            </View>
        </Section>
    )
})