declare class XmlNode {
    tag: string;
    name: string;
    namespace: string;
    attrs: any;
    selfCloseNode: boolean;
    text: string;
    path: string;
    children: Array<XmlNode>;
}
declare function parseXml(xml: string, options?: any): XmlNode | undefined;
export { XmlNode, parseXml };
