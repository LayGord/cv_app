import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { ObjectiveData } from "entities/Resume";
import { Section } from '../layout/Section';


interface ObjectiveInfoProps {
    data: ObjectiveData;
}

const styles = StyleSheet.create({
    objectiveInfo: {
        flexDirection: 'column',
    },
    title: {
        fontSize: 16,
        color: '#595959',
        borderBottom: '1px solid #595959'
    },
    header: {
        flexDirection: 'row'
    },
    position: {
        fontSize: 16,
        fontWeight: 700,
        minWidth: '75%'
    },
    salary: {
        width: '25%',
        fontSize: 16,
        fontWeight: 700,
        textAlign: 'right'
    },
    details: {
        flexDirection: 'column'
    }
});

export const ObjectiveInfo = memo((props: ObjectiveInfoProps) => {
    const { data } = props;
    const { t } = useTranslation('preview', {keyPrefix: 'objectiveInfo'});
    
    return (
        <Section title={t('title')}>
            <View style={styles.objectiveInfo}>
                <View style={styles.header}>
                    <Text style={styles.position}>
                        { data.positions.map(item => item.name).join(', ') }
                    </Text>

                    { data.salary && data.currency &&
                        <View style={styles.salary}>
                            <Text>{ data.salary }</Text>
                            <Text>
                                { t(data.currency.toLowerCase(), {keyPrefix: 'currencyOptions', ns: 'translation'}) }
                            </Text>
                        </View>
                    }

                </View>
                <View style={styles.details}>
                    <Text>
                        {t('typeOfEmpl', { toe: data.typeOfEmpl.map(item => t(item, {keyPrefix: 'objectiveInfo.toeOptions'})).join(', ') })}
                    </Text>
                    <Text>{t('format', { format: t(data.format, {keyPrefix: 'objectiveInfo.formatOptions'}) })}</Text>
                    <Text>
                        { data.workweek
                            ? t('workweek', { workweek: data.workweek })
                            : t('workweek', { context: 'empty' })
                        }
                    </Text>
                </View>
            </View>
        </Section>
    )
});