import { getAttractionImage, getAttractionPhotos } from './imageUtils';

// 景点数据接口
export interface Attraction {
    id: number;
    name: string;
    location: string;
    description: string;
    image: string;
    story: string;
    photos: string[];
    category: string;
}

// 景点数据
export const attractions: Attraction[] = [
    // 一、毛泽东相关纪念地
    {
        id: 1,
        name: '韶山毛泽东故居',
        location: '湖南省湘潭市韶山市',
        description: '毛泽东同志的出生地和成长地，是中国革命的圣地之一。',
        image: getAttractionImage(1),
        story: '毛泽东同志在这里度过了他的童年和少年时期。故居建于1878年，是一座典型的湖南农村民居。在这里，毛泽东同志接受了启蒙教育，开始了他追求真理、探索救国救民道路的历程。',
        photos: getAttractionPhotos(1, '韶山毛泽东故居'),
        category: '毛泽东相关纪念地'
    },
    {
        id: 2,
        name: '湖南第一师范',
        location: '湖南省长沙市天心区',
        description: '毛泽东青年时期求学地，被誉为"革命的摇篮"，校内保留了他的学习旧址和革命活动展览。',
        image: getAttractionImage(2),
        story: '湖南第一师范是毛泽东青年时期求学的地方，校内保留了他的学习旧址和革命活动展览。这里培养了毛泽东的革命思想，为他日后的革命活动奠定了基础。',
        photos: getAttractionPhotos(2, '湖南第一师范'),
        category: '毛泽东相关纪念地'
    },
    {
        id: 3,
        name: '橘子洲头',
        location: '湖南省长沙市岳麓区',
        description: '毛泽东青年时代常游之地，建有巨型毛泽东青年艺术雕塑，刻有《沁园春·长沙》词碑。',
        image: getAttractionImage(3),
        story: '橘子洲头是毛泽东青年时代常游之地，这里建有巨型毛泽东青年艺术雕塑，刻有《沁园春·长沙》词碑。这里见证了毛泽东青年时期的革命理想和抱负。',
        photos: getAttractionPhotos(3, '橘子洲头'),
        category: '毛泽东相关纪念地'
    },

    // 二、重要起义与会议旧址
    {
        id: 4,
        name: '秋收起义文家市会师纪念馆',
        location: '湖南省浏阳市文家市镇',
        description: '1927年秋收起义部队会师地，标志着中国革命从城市转向农村的转折点。',
        image: getAttractionImage(4),
        story: '1927年秋收起义部队在此会师，标志着中国革命从城市转向农村的转折点。这里见证了毛泽东同志"农村包围城市"革命道路的形成。',
        photos: getAttractionPhotos(4, '秋收起义文家市会师纪念馆'),
        category: '重要起义与会议旧址'
    },
    {
        id: 5,
        name: '平江起义纪念馆',
        location: '湖南省岳阳市平江县',
        description: '1928年彭德怀、滕代远领导的平江起义旧址，现为全国重点文物保护单位。',
        image: getAttractionImage(5),
        story: '1928年彭德怀、滕代远在此领导平江起义，建立了平江工农兵苏维埃政府，是湘鄂赣革命根据地的重要组成部分。',
        photos: getAttractionPhotos(5, '平江起义纪念馆'),
        category: '重要起义与会议旧址'
    },
    {
        id: 6,
        name: '通道转兵纪念馆',
        location: '湖南省怀化市通道县',
        description: '1934年红军长征途经通道时的"通道会议"旧址，挽救了红军命运的重要决策地。',
        image: getAttractionImage(6),
        story: '1934年红军长征途经通道时，在此召开"通道会议"，决定放弃原定计划，转向贵州，这一决策挽救了红军命运，是长征中的重要转折点。',
        photos: getAttractionPhotos(6, '通道转兵纪念馆'),
        category: '重要起义与会议旧址'
    },

    // 三、革命领袖故里
    {
        id: 7,
        name: '刘少奇故里',
        location: '湖南省宁乡市花明楼镇',
        description: '刘少奇出生地，包括故居、纪念馆和铜像广场，与韶山、彭德怀故居构成"红三角"。',
        image: getAttractionImage(7),
        story: '刘少奇同志在此出生并度过了他的童年和少年时期。故居及纪念馆展示了刘少奇同志的革命生涯和为中国革命事业作出的重要贡献。',
        photos: getAttractionPhotos(7, '刘少奇故里'),
        category: '革命领袖故里'
    },
    {
        id: 8,
        name: '彭德怀故居',
        location: '湖南省湘潭市乌石镇',
        description: '彭德怀元帅的出生地及纪念馆，展示其革命生涯和军事贡献。',
        image: getAttractionImage(8),
        story: '彭德怀元帅在此出生并度过了他的童年和少年时期。故居及纪念馆展示了彭德怀元帅的革命生涯和军事贡献，以及他为中国革命和建设事业作出的重要贡献。',
        photos: getAttractionPhotos(8, '彭德怀故居'),
        category: '革命领袖故里'
    },
    {
        id: 9,
        name: '贺龙故居',
        location: '湖南省张家界市桑植县',
        description: '贺龙元帅的故乡，故居及纪念馆陈列其领导南昌起义、创建红二军团的事迹。',
        image: getAttractionImage(9),
        story: '贺龙元帅在此出生并度过了他的童年和少年时期。故居及纪念馆展示了贺龙元帅的革命生涯，特别是他领导南昌起义、创建红二军团的事迹。',
        photos: getAttractionPhotos(9, '贺龙故居'),
        category: '革命领袖故里'
    },

    // 四、红军长征与抗战遗址
    {
        id: 10,
        name: '湘江战役旧址',
        location: '湖南省永州市道县、全州县交界',
        description: '红军长征中惨烈的湘江战役发生地，道县建有烈士纪念园。',
        image: getAttractionImage(10),
        story: '1934年，红军长征途经此地时，与国民党军队在此展开了一场惨烈的战斗，史称"湘江战役"。这场战役是红军长征以来损失最为惨重的一战，道县建有烈士纪念园，纪念在此牺牲的革命先烈。',
        photos: getAttractionPhotos(10, '湘江战役旧址'),
        category: '红军长征与抗战遗址'
    },
    {
        id: 11,
        name: '炎陵县红军标语博物馆',
        location: '湖南省株洲市炎陵县',
        description: '保存了300多条红军标语，是全国唯一的红军标语专题博物馆。',
        image: getAttractionImage(11),
        story: '炎陵县红军标语博物馆保存了300多条红军标语，是全国唯一的红军标语专题博物馆。这些标语记录了红军在革命战争年代的宣传工作和革命理念。',
        photos: getAttractionPhotos(11, '炎陵县红军标语博物馆'),
        category: '红军长征与抗战遗址'
    },
    {
        id: 12,
        name: '汝城县沙洲村"半条被子"故事发生地',
        location: '湖南省郴州市汝城县',
        description: '长征途中红军与村民徐解秀"半条被子"故事的起源地，现为红色教育基地。',
        image: getAttractionImage(12),
        story: '1934年，红军长征途经汝城县沙洲村时，三位女红军借宿在村民徐解秀家中。临走时，她们将仅有的一条被子剪下一半留给徐解秀。这个"半条被子"的故事，生动诠释了共产党与人民群众的鱼水情深。',
        photos: getAttractionPhotos(12, '汝城县沙洲村半条被子故事发生地'),
        category: '红军长征与抗战遗址'
    },

    // 五、早期革命活动旧址
    {
        id: 13,
        name: '中共湘区委员会旧址',
        location: '湖南省长沙市开福区清水塘',
        description: '毛泽东、杨开慧曾居住并领导湖南工农运动的地方，湖南最早的省级党组织所在地。',
        image: getAttractionImage(13),
        story: '中共湘区委员会旧址是湖南最早的省级党组织所在地。毛泽东、杨开慧曾在此居住并领导湖南工农运动，这里见证了湖南早期革命活动的重要历史。',
        photos: getAttractionPhotos(13, '中共湘区委员会旧址'),
        category: '早期革命活动旧址'
    },
    {
        id: 14,
        name: '湘南起义纪念馆',
        location: '湖南省郴州市宜章县',
        description: '1928年朱德、陈毅领导的湘南起义策源地，推动了井冈山会师。',
        image: getAttractionImage(14),
        story: '1928年，朱德、陈毅在此领导湘南起义，建立了湘南苏维埃政府，推动了井冈山会师。这里见证了湘南地区革命斗争的重要历史。',
        photos: getAttractionPhotos(14, '湘南起义纪念馆'),
        category: '早期革命活动旧址'
    },
   

    // 六、烈士陵园与纪念馆
    {
        id: 15,
        name: '湖南烈士公园',
        location: '湖南省长沙市开福区',
        description: '纪念近10万名湖南革命烈士，园内建有纪念塔和陈列馆。',
        image: getAttractionImage(15),
        story: '湖南烈士公园是为纪念近10万名湖南革命烈士而建，园内建有纪念塔和陈列馆。这里安葬了许多为革命事业献身的烈士，是缅怀革命先烈的重要场所。',
        photos: getAttractionPhotos(15, '湖南烈士公园'),
        category: '烈士陵园与纪念馆'
    },
    
];