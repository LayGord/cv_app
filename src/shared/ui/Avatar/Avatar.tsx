import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Avatar.module.scss";
import avatarDefault from 'shared/assets/images/avatar_default.png';

export enum AvatarSize {
    S = 'size_s',
    M = 'size_m',
    L = 'size_l',
};

interface AvatarProps {
    className?: string;
    src?: string;
    size?: AvatarSize;
};

export const Avatar = (props: AvatarProps) => {
    const {
        className,
        src = avatarDefault,
        size = AvatarSize.M,
    } = props;

    return(
        <div className={ classNames(cls.Avatar, {}, [className, cls[size]]) }>
            <img src={src} alt="Avatar" />
        </div>
    );
};
