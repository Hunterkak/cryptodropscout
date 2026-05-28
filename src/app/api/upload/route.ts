import { NextResponse } from 'next/server';

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({

  cloud_name:
    'dgdqlhwo7',

  api_key:
    '447565838424196',

  api_secret:
    'DcXgBS4l0T3hMzo5nxeSwM0FrWE',

});

export async function POST(
  req: Request
) {

  try {

    const formData =
      await req.formData();

    const file =
      formData.get(
        'file'
      ) as File;

    if (!file) {

      return NextResponse.json(

        {

          success: false,

          error:
            'No file uploaded',

        },

        {

          status: 400,

        }

      );

    }

    const bytes =
      await file.arrayBuffer();

    const buffer =
      Buffer.from(bytes);

    const result =
      await new Promise(
        (
          resolve,
          reject
        ) => {

          const stream =
            cloudinary
              .uploader
              .upload_stream(

                {

                  folder:
                    'projects',

                },

                (
                  error,
                  result
                ) => {

                  if (error) {

                    reject(
                      error
                    );

                  } else {

                    resolve(
                      result
                    );

                  }

                }
              );

          stream.end(
            buffer
          );

        }
      );

    return NextResponse.json({

      success: true,

      url:
        (result as any)
          .secure_url,

    });

  } catch (error) {

    console.error(
      'Upload Error:',
      error
    );

    return NextResponse.json(

      {

        success: false,

        error:
          'Upload failed',

      },

      {

        status: 500,

      }

    );

  }

}