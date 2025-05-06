/**
 * 获取景点默认图片
 * @param id 景点ID
 * @returns 图片路径
 */
export const getAttractionImage = (id: number): string => {
    // 实际项目中应替换为真实图片路径
    return `https://picsum.photos/800/400?random=${id}`;
};

/**
 * 获取景点照片集
 * @param id 景点ID
 * @param count 照片数量
 * @returns 照片路径数组
 */
export const getAttractionPhotos = (id: number, name: string): string[] => {
    // 根据景点名称获取对应的照片路径（不包括1号图片，因为它是封面）
    const photos: string[] = [];
    // 遍历目录中的实际图片
    const maxPhotos: { [key: string]: number } = {
        '韶山毛泽东故居': 4,
        '湖南第一师范': 5,
        '橘子洲头': 3,
        '秋收起义文家市会师纪念馆': 5,
        '平江起义纪念馆': 2,
        '通道转兵纪念馆': 3,
        '刘少奇故里': 3,
        '彭德怀故居': 3,
        '贺龙故居': 2,
        '湘江战役旧址': 3,
        '炎陵县红军标语博物馆': 3,
        '汝城县沙洲村半条被子故事发生地': 3,
        '中共湘区委员会旧址': 2,
        '湘南起义纪念馆': 3,
        '茶陵县工农兵政府旧址': 4,
        '湖南烈士公园': 3,
        '杨开慧故居': 3
    };
    
    const maxCount = maxPhotos[name] || 3;
    for (let i = 2; i <= maxCount; i++) {
        const photoPath = `/scenicspotpictures/${encodeURIComponent(name)}${i}.jpg`;
        photos.push(photoPath);
    }
    return photos;
};