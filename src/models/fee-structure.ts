import mongoose from 'mongoose';

interface IFeeStructureAttributes {
  baseFee: number;
  salePercentFee: number;
  additionalPercentFee?: number;
  shippingPercentFee?: number;
  minFee?: number;
}

export interface IFeeStructureDocument
  extends mongoose.Document<IFeeStructureAttributes> {
  baseFee: number;
  salePercentFee: number;
  additionalPercentFee?: number;
  shippingPercentFee?: number;
  minFee?: number;
}

interface IFeeStructureModel extends mongoose.Model<IFeeStructureDocument> {
  build(attributes: IFeeStructureAttributes): IFeeStructureDocument;
}

const feeStructureSchema = new mongoose.Schema(
  {
    baseFee: {
      type: Number,
      required: true,
    },
    salePercentFee: {
      type: Number,
      required: true,
    },
    additionalPercentFee: {
      type: Number,
      required: false,
    },
    shippingPercentFee: {
      type: Number,
      required: false,
    },
    minFee: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

feeStructureSchema.static(
  'build',
  (attributes: IFeeStructureAttributes) => new Platform(attributes)
);

export const Platform = mongoose.model<
  IFeeStructureDocument,
  IFeeStructureModel
>('FeeStructure', feeStructureSchema);
