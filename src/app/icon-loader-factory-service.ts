import { IconSvgService } from '@niceltd/cxone-client-platform-services';

export const iconLoaderFactory = () => {
    return async () => await IconSvgService.instance.loadAllIconsSprite();
};
