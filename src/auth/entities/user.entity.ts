import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {

    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column({
        type: 'text',
        unique: true
    })
    email: string;

    @ApiProperty()
    @Column({
        type: 'text',
        select: false
    })
    password: string;

    @ApiProperty()
    @Column({
        type: 'text'
    })
    @IsString()
    fullName: string;

    @ApiProperty()
    @Column('bool', {
        default: true
    })
    isActive: boolean;

    @ApiProperty()
    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[];

    @BeforeInsert()
    checkfieldsBeforeInsert() {
        this.email = this.email.toLowerCase();

        this.fullName = this.fullName.split(' ').map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(' ');
    }

    @BeforeUpdate()
    checkfieldsBeforeUpdate() {
        this.checkfieldsBeforeInsert();
    }
}
