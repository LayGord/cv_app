import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { ProjectData } from "entities/Resume";
import { Section } from "../layout/Section";
import { generateQrCode } from "features/RenderResumeToPdf/model/services/generateQrCode/generateQrCode";


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
    },
    secondColumn: {
        marginLeft: 'auto'
    },
    qrCode: {
        width: 64,
        height: 64
    }
});

export const ProjectsInfo = memo((props: ProjectsInfoProps) => {
    const { data } = props;
    const { t } = useTranslation('preview', {keyPrefix: 'projectsInfo'});

    const renderProjectItem = (item: ProjectData) => {

        const linkQrCode = item.link ? generateQrCode(item.link) : undefined;

        return (
            <View style={styles.projectItem}>
                <View style={styles.mainColumn}>
                    <Text style={ styles.title }>{ item.title }</Text>
                    { item.description && <Text>{ item.description }</Text>}
                    { item.link && <Text>{ item.link }</Text>}
                </View>
                <View style={styles.secondColumn}>
                    {
                        linkQrCode && 
                        <Image
                            style={styles.qrCode}
                            src={linkQrCode}
                        />
                    }
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