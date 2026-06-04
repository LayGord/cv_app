import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { Resume } from "entities/Resume";
import { useTranslation } from "react-i18next";
import { Section } from '../layout/Section';


interface ObjectiveInfoProps {
    data: Resume;
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

export const ObjectiveInfo = (props: ObjectiveInfoProps) => {
    const { data } = props;
    const { t } = useTranslation('preview');
    
    return (
        <Section title={t('objectiveInfo.title')}>
            <View style={styles.objectiveInfo}>
                <View style={styles.header}>
                    <Text style={styles.position}>
                        { data.objective.positions.map(item => item.name).join(', ') }
                    </Text>

                    { data.objective.salary && data.objective.currency &&
                        <View style={styles.salary} debug>
                            <Text>{ data.objective.salary }</Text>
                            <Text>
                                { t(data.objective.currency.toLowerCase(), {keyPrefix: 'currencyOptions', ns: 'translation'}) }
                            </Text>
                        </View>
                    }

                </View>
                <View style={styles.details}>
                    <Text>
                        {t('objectiveInfo.typeOfEmpl', { toe: data.objective.typeOfEmpl.map(item => item.displayName).join(', ') })}
                    </Text>
                    <Text>{t('objectiveInfo.format', { format: data.objective.format })}</Text>
                    <Text>
                        { data.objective.workweek
                            ? t('objectiveInfo.workweek', { workweek: data.objective.workweek })
                            : t('objectiveInfo.workweekEmpty')
                        }
                    </Text>
                </View>
            </View>
        </Section>
    )
}