import { SkillData } from "../types/skills";

export const loadSkillsByLocale = async (locale: string): Promise<SkillData[]> => {
    const normalizedLocaleStirng = locale.startsWith('ru') ? 'ru' : 'en';

    switch (normalizedLocaleStirng) {
    case 'ru': {
        const module = await import('../data/ru');
        return module.skillsRu;
    }
    case 'en': {
        const module = await import('../data/en');
        return module.skillsEn;
    }
    default: {
        const module = await import('../data/en');
        return module.skillsEn;
    }
    };
}