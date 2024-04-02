import { IconSvgService } from '@niceltd/cxone-client-platform-services';
import { iconLoaderFactory } from './icon-loader-factory-service';

describe('iconLoaderFactory', () => {
  it('should call IconSvgService.loadAllIconsSprite', async () => {
    const loadAllIconsSpriteSpy = spyOn(IconSvgService.instance, 'loadAllIconsSprite').and.returnValue(Promise.resolve('icon data'));
    const loadIcons = iconLoaderFactory();
    const result = await loadIcons();
    expect(loadAllIconsSpriteSpy).toHaveBeenCalled();
    expect(result).toBe('icon data');
  });
});

