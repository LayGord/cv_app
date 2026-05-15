import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Avatar.module.scss";
import avatarDefault from 'shared/assets/images/avatar_default.png';
import { memo, useCallback } from "react";

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

export const Avatar = memo((props: AvatarProps) => {
    const {
        className,
        src,
        size = AvatarSize.M,
    } = props;

    const avatartSrc = src || avatarDefault;

    const onError = useCallback((e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = avatarDefault;
    }, []);

    return(
        <div className={ classNames(cls.Avatar, {}, [className, cls[size]]) }>
            <img
                src={avatartSrc}
                alt="Avatar"
                onError={onError}
            />
        </div>
    );
});
Avatar.displayName = 'Avatar';