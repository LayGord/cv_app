import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { Resume } from 'entities/Resume';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Regular from 'shared/assets/fonts/Roboto-Regular.ttf';
import SemiBold from 'shared/assets/fonts/Roboto-SemiBold.ttf';
import avatarDefault from 'shared/assets/images/avatar_default.png';
import { calcYears } from 'shared/lib/calcYears/calcYears';
import { formatDate } from 'shared/lib/formatDate/formatDate';


interface ResumePdfTemplateProps {
    data: DeepPartial<Resume>;
}

Font.register({
    family: 'Roboto',
    fonts: [
        { src: Regular, fontWeight: 400 },
        { src: SemiBold, fontWeight: 700 },
    ],
});

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Roboto',
        fontWeight: 400,
        fontSize: 10,
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: 36,
    },

    personalInfo: {
        flexDirection: 'row',
        gap: 24
    },
    avatar: {
        width: 120,
        height: 120,
        backgroundColor: '#f0f0f0',
        minWidth: 120,
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
        marginVertical: 6,
        flexDirection: 'column'
    },
    preferredMarker: {
        color: '#595959'
    }
});

export const ResumePdfTemplate = (props: ResumePdfTemplateProps) => {
    const { data } = props;
    const { t, i18n } = useTranslation('preview');

    const mappedContacts = useMemo(() => {
        const links = Object.values(data.contacts?.links ?? {}).map((item) => ({
            id: item?.id,
            displayName: item?.title,
            value: item?.link,
            preferred: data.contacts?.preferred === item?.id,
        }));

        return [
            {
                id: 'email',
                displayName: t('personalInfo.email'),
                value: data.contacts?.email,
                preferred: data.contacts?.preferred === 'email',
            },
            {
                id: 'phone',
                displayName: t('personalInfo.phone'),
                value: data.contacts?.phone,
                preferred: data.contacts?.preferred === 'phone',
            },
            ...links,
        ];
    }, [data.contacts?.email, data.contacts?.links, data.contacts?.phone, data.contacts?.preferred, t]);

    if (!data.personal) {
        return
    }

    if (!data.contacts) {
        return;
    }

    if (!data.objective) {
        return
    }

    return (
        <Document pageLayout='oneColumn'>
            <Page size="A4" style={styles.page}>
                <View style={styles.personalInfo}>
                    <View style={styles.avatar}>
                        <Image
                            style={{ width: '100%', height: '100%', objectFit: 'cover'}}
                            src={ data.personal.photo || avatarDefault }
                        />
                    </View>

                    <View style={styles.textInfo} >
                        <Text style={styles.fullname}>
                            { `${data.personal.lastname} ${data.personal.firstname} ${data.personal.patronymic || ''}`}
                        </Text>

                        <Text style={styles.row} >
                            { data.personal.sex 
                                ? t(data.personal.sex)
                                : t('personalInfo.sexEmpty')
                            }

                            { 
                                data.personal.birthdate ?
                                    data.personal.sex === 'male'
                                        ? t('personalInfo.birthdateMale', { 
                                            years: calcYears(data.personal.birthdate),
                                            birthdate: formatDate(data.personal.birthdate, i18n.language)
                                        })
                                        : t('personalInfo.birthdateFemale', { 
                                            years: calcYears(data.personal.birthdate),
                                            birthdate: formatDate(data.personal.birthdate, i18n.language)
                                        })
                                    : t('personalInfo.birthdateEmpty')       
                            }
                        </Text>
                       
                        <View style={styles.contacts}>
                            { 
                                mappedContacts.map((item) => {
                                    return (
                                        <View style={styles.row}>
                                            <Text>{ item.displayName + ': ' + item.value }</Text>
                                            {   item.preferred &&
                                                <Text style={styles.preferredMarker}>{ t('personalInfo.preferredContact') }</Text>
                                            }
                                        </View>
                                    )
                                })
                            }

                        </View>

                        <Text  >
                            { data.personal.city && data.personal.country 
                                ? t('personalInfo.location', { city: data.personal.city, country: data.personal.country }) 
                                : t('personalInfo.locationEmpty')
                            }
                        </Text>

                        <View style={styles.row}>
                            <Text>
                                { data.objective.readyToRelocate
                                    ? t('personalInfo.readyToRelocate') 
                                    : t('personalInfo.notReadyToRelocate')
                                }
                            </Text>
                            <Text>
                                { data.objective.readyToBTrip
                                    ? t('personalInfo.readyToBTrip') 
                                    : t('personalInfo.notReadyToBTrip')
                                }
                            </Text>
                        </View>

                        <Text>
                            { data.personal.citizenship 
                                ? t('personalInfo.citizenship', { citizenship: data.personal.citizenship })
                                : t('personalInfo.citizenshipEmpty')
                            }
                        </Text>


                    </View>
                </View>
            </Page>
        </Document>
    );
};
