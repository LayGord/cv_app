import { skillsEn } from "./en";
import { skillsRu } from "./ru";

type SkillData = {
  id: string;
  displayName: string;
  category?: string;
};

export function findDuplicateSkillIds(skills: SkillData[]) {
    const grouped = new Map<string, SkillData[]>();

    for (const skill of skills) {
        const existing = grouped.get(skill.id);

        if (existing) {
            existing.push(skill);
        } else {
            grouped.set(skill.id, [skill]);
        }
    }

    return Array.from(grouped.entries())
        .filter(([, items]) => items.length > 1)
        .map(([id, items]) => ({
            id,
            count: items.length,
            items,
        }));
}

const listRu = skillsRu
const listEn = skillsEn

console.log(' ---- RU ----')

const duplicatesRu = findDuplicateSkillIds(listRu);

if (duplicatesRu.length === 0) {
    console.log("skillsets ok");
} else {
    console.log("Found duplicates:");
    console.log(JSON.stringify(duplicatesRu, null, 2));
}

console.log('\n\n ---- En ----')

const duplicatesEn = findDuplicateSkillIds(listEn);

if (duplicatesEn.length === 0) {
    console.log("skillsets ok");
} else {
    console.log("Found duplicates:");
    console.log(JSON.stringify(duplicatesEn, null, 2));
}