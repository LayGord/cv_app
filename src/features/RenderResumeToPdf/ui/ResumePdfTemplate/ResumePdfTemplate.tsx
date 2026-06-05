import { useTranslation } from 'react-i18next';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { Resume, ObjectiveData, EducationData } from 'entities/Resume';
import Regular from 'shared/assets/fonts/Roboto-Regular.ttf';
import SemiBold from 'shared/assets/fonts/Roboto-SemiBold.ttf';
import { PersonalInfo } from './sections/PersonalInfo';
import { ObjectiveInfo } from './sections/ObjectiveInfo';
import { EducationInfo } from './sections/EducationInfo';


/**
 *  Font styles for text content
 *    --- name: 22pt semibold 
 *    --- section titles 16pt regular 
 *    --- important 16pt semibold 
 **/

interface ResumePdfTemplateProps {
    data: Resume;
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
        paddingVertical: 36,
        paddingHorizontal: 52,
    },
});

export const ResumePdfTemplate = (props: ResumePdfTemplateProps) => {
    const { data } = props;
    const { t, i18n } = useTranslation('preview');

    return (
        <Document pageLayout='oneColumn'>
            <Page size="A4" style={styles.page}>
                <PersonalInfo data={data as Resume} />
                <ObjectiveInfo data={data.objective as ObjectiveData} />
                { data.education.length > 0 &&
                    <EducationInfo data={data.education as EducationData[]}/> 
                }
            </Page>
        </Document>
    );
};
