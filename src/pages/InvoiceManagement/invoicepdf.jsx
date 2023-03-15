import React from "react";
import { Document, Page, TextItem } from "react-pdf";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 12,
    marginBottom: 10,
  },
});

const InvoicePDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* <View style={styles.section}> */}
      <TextItem style={styles.heading}>My PDF Document</TextItem>
      {data.map((item) => (
        <TextItem key={item.id} style={styles.paragraph}>
          {item.text}
        </TextItem>
      ))}
      {/* </View> */}
    </Page>
  </Document>
);

export default InvoicePDF;
