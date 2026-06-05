import { useMemo } from "react";
import { Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { Resume } from "entities/Resume";
import { useTranslation } from "react-i18next";
import avatarDefault from 'shared/assets/images/avatar_default.png';
import { calcYears } from 'shared/lib/calcYears/calcYears';
import { formatDate } from 'shared/lib/formatDate/formatDate';
import { Section } from "../layout/Section";


interface PersonalInfoProps {
    data: Resume;
}

const styles = StyleSheet.create({
    personalInfo: {
        flexDirection: 'row',
        gap: 24,
    },
    avatar: {
        width: 120,
        height: 120,
        backgroundColor: '#f0f0f0',
        minWidth: 120,
        marginTop: 12
    },
    textInfo: {
        flexDirection: 'column',
        gap: 1,
        width: '100%'
    },
    fullname: {
        fontSize: 22,
        fontWeight: 700
    },
    row: {
        flexDirection: 'row',
        gap: 6
    },
    contacts: {
        marginVertical: 8,
        flexDirection: 'column'
    },
    preferredMarker: {
        color: '#595959'
    }
});

export const PersonalInfo = (props: PersonalInfoProps) => {
    const { data } = props;
    const { t, i18n } = useTranslation('preview', {keyPrefix: 'personalInfo'});
    
    const mappedContacts = useMemo(() => {
        const links = Object.values(data.contacts.links ?? {}).map((item) => ({
            id: item.id,
            displayName: item.title,
            value: item.link,
            preferred: data.contacts.preferred === item?.id,
        }));
    
        return [
            {
                id: 'email',
                displayName: t('email'),
                value: data.contacts.email,
                preferred: data.contacts.preferred === 'email',
            },
            {
                id: 'phone',
                displayName: t('phone'),
                value: data.contacts.phone,
                preferred: data.contacts.preferred === 'phone',
            },
            ...links,
        ];
    }, [data.contacts.email, data.contacts.links, data.contacts.phone, data.contacts.preferred, t]);
    

    return (
        <Section title=" ">
            <View style={styles.personalInfo}>
                <View style={styles.avatar}>
                    <Image
                        style={{ width: '100%', height: '100%', objectFit: 'cover'}}
                        src={ data.personal.photo || avatarDefault }
                    />
                </View>

                <View style={styles.textInfo} >
                    <Text style={styles.fullname}>
                        { `${ data.personal.lastname} ${data.personal.firstname} ${data.personal.patronymic || ''}`}
                    </Text>

                    <Text style={styles.row} >
                        { data.personal.sex 
                            ? t(data.personal.sex)
                            : t('sex', { context: 'empty' })
                        }

                        { data.personal.birthdate
                            ? t('birthdate', {
                                context: data.personal.sex,
                                years: calcYears(data.personal.birthdate),
                                birthdate: formatDate(data.personal.birthdate, i18n.language)
                            })
                            : t('birthdate', { context: 'empty' })       
                        }
                    </Text>
                    
                    <View style={styles.contacts}>
                        { mappedContacts.map((item) => {
                            return (
                                <View style={styles.row}>
                                    <Text>{ item.displayName + ': ' + item.value }</Text>
                                    {   item.preferred &&
                                        <Text style={styles.preferredMarker}>{ t('preferredContact') }</Text>
                                    }
                                </View>
                            )})
                        }
                    </View>

                    <Text  >
                        { data.personal.city && data.personal.country 
                            ? t('location', { city: data.personal.city, country: data.personal.country }) 
                            : t('location', { context: 'empty' })
                        }
                    </Text>

                    <View style={styles.row}>
                        <Text>
                            { data.objective.readyToRelocate
                                ? t('readyToRelocate') 
                                : t('notReadyToRelocate')
                            }
                        </Text>
                        <Text>
                            { data.objective.readyToBTrip
                                ? t('readyToBTrip') 
                                : t('notReadyToBTrip')
                            }
                        </Text>
                    </View>

                    <Text>
                        { data.personal.citizenship 
                            ? t('citizenship', { citizenship: data.personal.citizenship })
                            : t('citizenship', { context: 'empty' })
                        }
                    </Text>

                    <Text>
                        
                    </Text>
                </View>
            </View>
        </Section>
    )
}