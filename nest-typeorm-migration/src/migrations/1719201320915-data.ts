import { MigrationInterface, QueryRunner } from "typeorm";

export class Data1719201320915 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("INSERT INTO `article` VALUES (1,'夏日经济“热力”十足 “点燃”文旅消费新活力','人民网北京6月17日电 （高清扬）高考结束、暑期将至，各地文旅市场持续火热，暑期出游迎来热潮。热气腾腾的“夏日经济”成为消费活力升级的缩影，展示出我国文旅产业的持续发展势头。','2024-06-24 03:16:33.163474','2024-06-24 03:16:33.163474'),(2,'科学把握全面深化改革的方法要求','科学的方法是做好一切工作的重要保证。全面深化改革是一场复杂而深刻的社会变革，必须运用科学方法才能取得成功。','2024-06-24 03:16:33.181289','2024-06-24 03:16:33.181289');")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // * 如果你要支持 revert，那 down 方法里应该补上 delete 语句
    }

}
