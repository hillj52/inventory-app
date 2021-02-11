import mongoose from 'mongoose';

import { IFeeStructureDocument } from './fee-structure';

interface IPlatformAttributes {
  name: string;
  feeStructure: IFeeStructureDocument;
}

export interface IPlatformDocument
  extends mongoose.Document<IPlatformAttributes> {
  name: string;
  readonly feeStructures: {
    startDate?: Date;
    endDate?: Date;
    feeStructure: IFeeStructureDocument;
  }[];
  addFeeStructure: (
    feeStructure: IFeeStructureDocument,
    startDate: Date | undefined
  ) => IPlatformDocument;
}

interface IPlatformModel extends mongoose.Model<IPlatformDocument> {
  build(attributes: IPlatformAttributes): IPlatformDocument;
}

const platformSchema = new mongoose.Schema<IPlatformDocument, IPlatformModel>(
  {
    name: {
      type: String,
      required: true,
    },
    feeStructures: [
      {
        startDate: {
          type: Date,
          required: false,
        },
        endDate: {
          type: Date,
          required: false,
        },
        feeStructure: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'FeeStructure',
        },
      },
    ],
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

platformSchema.static('build', (attributes: IPlatformAttributes) => {
  const { name, feeStructure } = attributes;
  return new Platform({
    name,
    feeStructures: [
      {
        feeStructure,
      },
    ],
  });
});

platformSchema.methods.addFeeStructure = function (
  feeStructure: IFeeStructureDocument,
  startDate: Date
) {
  this.feeStructures.unshift({ startDate, feeStructure });
  this.feeStructures[1].endDate = new Date(startDate.getDate() - 1);
};

export const Platform = mongoose.model<IPlatformDocument, IPlatformModel>(
  'Source',
  platformSchema
);
