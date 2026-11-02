import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrderDetail } from "./order_detail.entity";
import { PaymentMethod } from "./payment_method.entity";

@Index("orders_pkey", ["id"], { unique: true })
@Entity("orders", { schema: "public" })
export class Order {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "user_id", nullable: true })
  userId: number | null;

  @Column("character varying", { name: "customer_name", nullable: true })
  customerName: string | null;

  @Column("character varying", { name: "customer_phone", nullable: true })
  customerPhone: string | null;

  @Column("character varying", { name: "payment_order_id", nullable: true })
  paymentOrderId: string | null;

  @Column("character varying", { name: "status", nullable: true })
  status: string | null;

  @Column("double precision", { name: "tax", nullable: true, precision: 53 })
  tax: number | null;

  @Column("double precision", { name: "total", nullable: true, precision: 53 })
  total: number | null;

  @Column("character varying", { name: "currency", nullable: true })
  currency: string | null;

  @Column("timestamp with time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("timestamp with time zone", {
    name: "updated_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date | null;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetail[];

  @ManyToOne(() => PaymentMethod, (paymentMethod) => paymentMethod.orders)
  @JoinColumn([{ name: "payment_method_id", referencedColumnName: "id" }])
  paymentMethod: PaymentMethod;
}
