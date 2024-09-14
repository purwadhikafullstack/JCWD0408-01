
type DiscountProps = {
    namadiscount: string;
    nominaldiscount: number;
};

const Discount: React.FC<DiscountProps> = ({ namadiscount, nominaldiscount }) => {
    return (
        <div>
            <div className="m-10 p-4 w-[250px] border-[2px] rounded-[16px]">
                <p>
                    {namadiscount}
                </p>
                <p>
                    {nominaldiscount}
                </p>
            </div>
        </div>
    )
};
export default Discount;
