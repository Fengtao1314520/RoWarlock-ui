/**
 * 获取 Annotation 类型节点
 * @param annotationElement
 * @constructor
 */
function GetAnnotationType(annotationElement) {
  // 命名空间
  const nsros = 'http://tempuri.org/RoFramework.xsd'

  // 获取节点
  const description = annotationElement.getElementsByTagNameNS(nsros, 'Description')[0].textContent
  const createauthor = annotationElement.getElementsByTagNameNS(nsros, 'Created')[0].getAttributeNS(nsros, 'Author')
  const createdate = annotationElement.getElementsByTagNameNS(nsros, 'Created')[0].getAttributeNS(nsros, 'Date')
  const lastupdateauthor = annotationElement.getElementsByTagNameNS(nsros, 'LastUpdated')[0].getAttributeNS(nsros, 'Author')
  const lastupdatedate = annotationElement.getElementsByTagNameNS(nsros, 'LastUpdated')[0].getAttributeNS(nsros, 'Date')

  const annotation = {
    description: description,
    create: {
      athor: createauthor,
      date: createdate
    },
    lastupdate: {
      athor: lastupdateauthor,
      date: lastupdatedate
    }
  }
  return annotation
}

export { GetAnnotationType }
