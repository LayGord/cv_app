import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { ProjectData } from "entities/Resume";
import { Section } from "../layout/Section";


interface ProjectsInfoProps {
    data: ProjectData[];
}

const styles = StyleSheet.create({
    projectInfo: {
        flexDirection: 'column',
        gap: 24,
    },
    projectItem: {
        flexDirection: 'row'
    },
    mainColumn: {
        flexDirection: 'column'
    },
    title: {
        fontSize: 14
    }
});

export const ProjectsInfo = memo((props: ProjectsInfoProps) => {
    const { data } = props;
    const { t } = useTranslation('preview', {keyPrefix: 'projectsInfo'});

    const renderProjectItem = (item: ProjectData) => {
        return (
            <View style={styles.projectItem}>
                <View style={styles.mainColumn}>
                    <Text style={styles.title}>{ item.title }</Text>
                    { item.description && <Text>{ item.description }</Text>}
                </View>
            </View>
        )
    };

    return (
        <Section title={t('title')}>    
            <View style={styles.projectInfo}>
                {
                    data.map(item => renderProjectItem(item))
                }
            </View>
        </Section>
    )
});