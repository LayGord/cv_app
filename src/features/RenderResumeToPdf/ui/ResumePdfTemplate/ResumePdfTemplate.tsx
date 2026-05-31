import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { Resume } from 'entities/Resume';
import { useTranslation } from 'react-i18next';
import Regular from 'shared/assets/fonts/Roboto-Regular.ttf';
import SemiBold from 'shared/assets/fonts/Roboto-SemiBold.ttf';
import avatarDefault from 'shared/assets/images/avatar_default.png';
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
        fontSize: 12,
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: 36,
    },

    personalInfo: {
        flexDirection: 'row',
        gap: 24
    },
    avatarWrapper: {
        width: 140,
        height: 140,
        backgroundColor: '#f0f0f0',
        minWidth: 140,
    },
    info: {
        flexDirection: 'column',
        gap: 4,
        width: '100%'
    },
    fullname: {
        fontSize: 18,
        fontWeight: 700
    },
    sexAndBdate: {
        fontSize: 12,
        flexDirection: 'row',
        gap: 1
    },
    location: {
        gap: 2
    }
    
});

export const ResumePdfTemplate = (props: ResumePdfTemplateProps) => {
    const { data } = props;
    const { t, i18n } = useTranslation('preview');

    if (!data.personal) {
        return
    }

    return (
        <Document pageLayout='oneColumn'>
            <Page size="A4" style={styles.page}>
                <View style={styles.personalInfo}>
                    <View style={styles.avatarWrapper}>
                        <Image
                            style={{ width: '100%', height: '100%', objectFit: 'cover'}}
                            src={ data.personal.photo || avatarDefault }
                        />
                    </View>
                    <View style={styles.info} >
                        <Text style={styles.fullname}>
                            { `${data.personal.lastname} ${data.personal.firstname} ${data.personal.patronymic || ''}`}
                        </Text>
                        <Text style={styles.sexAndBdate} >
                            { data.personal.sex 
                                ? t(data.personal.sex)
                                : t('personalInfo.sexEmpty')
                            }
                            { data.personal.birthdate 
                                ? t('personalInfo.birthdate', { birthdate: formatDate(data.personal.birthdate, i18n.language) }) 
                                : t('personalInfo.birthdateEmpty')
                            }
                        </Text>
                        <View style={styles.location}>
                            <Text  >
                                { data.personal.city && data.personal.country 
                                    ? t('personalInfo.location', { city: data.personal.city, country: data.personal.country }) 
                                    : t('personalInfo.locationEmpty')
                                }
                            </Text>
                        </View>

                        {/* { data.personal.citizenship 
                            ? t('personalInfo.citizenship', { citizenship: data.personal.citizenship })
                            : t('personalInfo.citizenshipEmpty')
                        } */}
                    </View>
                </View>
            </Page>
        </Document>
    );
};
