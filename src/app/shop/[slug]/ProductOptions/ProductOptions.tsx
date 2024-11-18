import styles from "./ProductOptions.module.css";
import { checkInStock } from "@/lib/utils";
import { products } from "@wix/stores";

interface ProductOptionsProps {
  product: products.Product;
  selectedOptions: Record<string, string>;
  setSelectedOptions: (options: Record<string, string>) => void;
}

export default function ProductOptions({
  product,
  selectedOptions,
  setSelectedOptions,
}: ProductOptionsProps) {
  return (
    <div className={styles.container}>
      {product.productOptions?.map((option) => (
        <fieldset key={option.name} className={styles.fieldset}>
          {/* <legend>{option.name}</legend> */}
          <div className={styles.optionContainer}>
            {option.choices?.map((choice) => (
              <div key={choice.description}>
                <input
                  type='radio'
                  id={choice.description}
                  name={option.name}
                  value={choice.description}
                  onChange={() =>
                    setSelectedOptions({
                      ...selectedOptions,
                      [option.name || ""]: choice.description || "",
                    })
                  }
                  checked={
                    selectedOptions[option.name || ""] === choice.description
                  }
                  className={styles.radioInput}
                  disabled={
                    !checkInStock(product, {
                      ...selectedOptions,
                      [option.name || ""]: choice.description || "",
                    })
                  }
                />
                <label
                  htmlFor={choice.description}
                  className={`${styles.radioLabel}`}
                >
                  {option.optionType === products.OptionType.color && (
                    <span
                      style={{
                        backgroundColor: choice.value,
                      }}
                    />
                  )}
                </label>
              </div>
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  );
}
