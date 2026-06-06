import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { JobData } from "entities/Resume";
import { Section } from "../layout/Section";


interface JobInfoProps {
    data: JobData[];
}

const styles = StyleSheet.create({
    jobInfo: {
        flexDirection: 'column',
        gap: 24,
    },
    jobItem: {
        flexDirection: 'row'
    },
    leftColumn: {
        width: '25%',
        color: '#595959',
        textAlign: 'left'
    },
    period: {
        fontSize: 10
    },
    mainColumn: {
        flexDirection: 'column'
    },
    orgName: {
        fontSize: 14
    }
});

export const JobInfo = memo((props: JobInfoProps) => {
    const { data } = props;
    const { t, i18n } = useTranslation('preview', {keyPrefix: 'jobInfo'});

    const renderJobItem = (item: JobData) => {
        return (
            <View style={styles.jobItem}>
                <View style={styles.leftColumn}>
                    <Text style={styles.period}>
                        { `${item.dateFrom.slice(0, 4)} — ${ item.dateTo?.slice(0, 4) || t('dateTo', {context: 'empty'})}` }
                    </Text>
                </View>
                <View style={styles.mainColumn}>
                    <Text style={styles.orgName}>{ `${item.company}, ${item.location}` }</Text>
                    <Text>{ item.position }</Text>
                    {item.comment && <Text>{ item.comment }</Text>}
                </View>
            </View>
        )
    };

    return (
        <Section title={t('title')}>
            <View style={styles.jobInfo}>
                {
                    data.map(item => renderJobItem(item))
                }
            </View>
        </Section>
    )
});