import cloudinary
import requests

from comicapis import settings


def do_revalidate(path_to_revalidate):
    headers = {
        'content-type': 'application/x-www-form-urlencoded',
    }

    url = settings.CLIENT_SIDE_DOMAIN + "/api/revalidate?secret=" + settings.BACKEND_REVALIDATE_SECRET

    payload = {"path_to_revalidate": path_to_revalidate}

    resp = requests.post(url=url, data=payload, headers=headers)

    print(resp)


def get_or_none(classmodel, **kwargs):
    try:
        return classmodel.objects.get(**kwargs)
    except classmodel.DoesNotExist:
        return None


def image_upload(file, folder):
    # image_name = file.rsplit('.', maxsplit=1)[0]
    res = cloudinary.uploader.upload(file,
                                     #  public_id=image_name,
                                     folder=folder,
                                     resource_type="auto")
    return res["secure_url"]
