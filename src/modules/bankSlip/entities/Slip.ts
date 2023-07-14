import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("boletos")
export class Slip {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome_sacado: string;

  @Column()
  id_lote: number;

  @Column("decimal", { precision: 10, scale: 2 })
  valor: number;

  @Column()
  linha_digitavel: string;

  @Column()
  ativo: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  criado_em: Date;
}
