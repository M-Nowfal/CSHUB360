import { Search } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useId, useState, type JSX } from "react";
import { Link } from "react-router-dom";
import { Input } from "../../components/ui/input";

const SearchBar = (): JSX.Element => {

  const [input, setInput] = useState<string>("");

  return (
    <div className="flex justify-center w-full max-w-2xl m-auto">
      <div className="flex items-center justify-between gap-1 border border-slate-400 dark:border-slate-700 w-full p-0.5 rounded-md">
        <div className="flex items-center w-full">
          <Search className="text-gray-400 size-5 ms-2" />
          <Input
            type="search"
            autoComplete="off"
            id={useId()}
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder="Search for courses"
            className="ps-2 border-0 focus-visible:ring-0 focus:outline-0 w-full shadow-none"
          />
        </div>
        <Link to={input ? `/courses?search=${input}` : ""} viewTransition>
          <Button variant="primary" size="lg">
            Search
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default SearchBar;
