import mongoose from 'mongoose';

export interface IBrandAttributes {
  name: string;
}

export interface IBrandDocument extends mongoose.Document<IBrandAttributes> {
  name: string;
}

interface IBrandModel extends mongoose.Model<IBrandDocument> {
  build(attributes: IBrandAttributes): IBrandDocument;
}

const brandSchema = new mongoose.Schema<IBrandDocument, IBrandModel>(
  {
    name: {
      type: String,
      required: true,
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

brandSchema.static(
  'build',
  (attributes: IBrandAttributes) => new Brand(attributes)
);

export const Brand = mongoose.model<IBrandDocument, IBrandModel>(
  'Brand',
  brandSchema
);
