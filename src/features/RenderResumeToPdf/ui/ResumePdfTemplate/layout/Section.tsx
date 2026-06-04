import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { ReactNode } from 'react';


interface SectionProps {
    title?: string;
    children: ReactNode;
}

const styles = StyleSheet.create({
    section: {
        flexDirection: 'column',
        marginBottom: 32,
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 16,
        color: '#595959',
        borderBottom: '0.2mm solid #595959',
        paddingBottom: 4,
        marginBottom: 12
    },
    content: {
        paddingHorizontal: 4
    }
});

export const Section = (props: SectionProps) => {
    const {
        title,
        children
    } = props;
    
    return (
        <View style={styles.section}>
            { title &&
                <Text style={styles.title}>{ title }</Text>
            }
            <View style={styles.content}>
                { children }
            </View>
        </View>
    )
}